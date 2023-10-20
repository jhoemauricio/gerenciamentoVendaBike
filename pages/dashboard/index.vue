<script setup lang="ts">
definePageMeta({
    layout: 'menus',
    middleware: 'auth'
})


import { ref } from 'vue';

const supabase = useSupabaseClient()


//Vender
const vender = async (id) => {
    //selciona pelo id e atualiza a propriedade
    const { error } = await supabase
        .from('bike')
        .update({ disponivel: false })
        .eq('id', id)

    if (error) {
        console.log('Error ao vender ' + error);
    }

    listar();
}


//listar
let bikes = ref('');
const listar = async () => {

    //lista todas as bikes
    const { data, error } = await supabase
        .from('bike')
        .select()
        //onde propriedade disponivel for true 
        .eq('disponivel', true)

    if (error) {
        console.log('Algo deu errado ao listar ' + error);
    }

    // variavel bikes recebe o valor de data
    bikes.value = data;


}



//deletar bike
const deletar = async (idBike) => {
    const { error } = await supabase
        .from('bike')
        .delete()
        .eq('id', idBike)

    if (error) {
        console.log('Erro ao excluir ' + error);
    }

    listar();
}



//método executado ao carregar a página
listar();


</script>

<template>
  

 
 <div class="h-screen bg-emerald-400 p-2">
   <div class="sm:grid sm:grid-cols-2 sm:gap-8 sm:p-2">
        <div v-for="b in bikes" class="mb-6 p-2 bg-white rounded  ">

            <div class="grid grid-cols-3">
                <div class="col-span-3 flex items-center justify-center p-2">
                    <div>
                        <img class=" w-24 h-24 mb-3 rounded-full shadow-lg" :src="b.img_bike" />

                    </div>

                </div>
                <div class="col-span-3 flex items-center justify-center">
                    <div class="p-2">
                        <p><b>{{ b.nome }}</b></p>
                    </div>
                    <div class="p-2">
                        <p>{{ b.modalidade }}</p>
                    </div>
                    <div class="p-2">
                        <p>R$ {{ b.preco }}</p>
                    </div>

                </div>
                <div class="col-span-3 p-2 flex justify-center items-center">
                    <div class="p-2">
                        <button class=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="vender(b.id)">Vender</button>

                    </div>
                    <div class="p-2">
                        <button
                            class=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                            <NuxtLink :to="`/dashboard/${b.id}`">Editar</NuxtLink>
                        </button>

                    </div>
                    <div class="p-2">
                        <button
                            class=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                            @click="deletar(b.id)">Excluir</button>

                    </div>



                </div>

            </div>


        </div>
        </div>
 </div>
   

</template>

<style lang="scss" scoped></style>