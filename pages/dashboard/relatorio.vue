<script setup lang="ts">
definePageMeta({
    layout: 'menus',
    middleware: 'auth'
})

import { ref } from 'vue';

const supabase = useSupabaseClient()

//listar
let bikes = ref('');
const listar = async () => {

    //lista todas as bikes
    const { data, error } = await supabase
        .from('bike')
        .select()
        //onde propriedade disponivel for false 
        .eq('disponivel', false)

    if (error) {
        console.log('Algo deu errado ao listar ' + error);
    }

    // variavel bikes recebe o valor de data
    bikes.value = data;


}


listar();


</script>

<template>
    <div class="h-screen bg-emerald-400 p-2">


        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nome Bike
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Modalidade
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Preço
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                    
                    </tr>
                </thead>
                <tbody >
                    <tr  v-for="b in bikes" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {{ b.nome }}
                        </th>
                        <td class="px-6 py-4">
                            {{ b.modalidade }}
                        </td>
                        <td class="px-6 py-4">
                            {{ b.preco }}
                        </td>
                        <td v-if="b.disponivel == false" class="px-6 py-3 text-red-600">
                            <b>Vendido</b>
                        </td>
                     
                    </tr>
                  
                </tbody>
            </table>
        </div>


    </div>
</template>

<style lang="scss" scoped></style>