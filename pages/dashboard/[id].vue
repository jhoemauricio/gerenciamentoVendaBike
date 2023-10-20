<script setup lang="ts">
definePageMeta({
    layout: 'menus'
})

import { Field, Form, ErrorMessage } from 'vee-validate';

const validarDadosBike = {
    nomeBike(value){
        if(!value){
            return 'Campo Nome Bike Obrigatório';
        } else {
            return true;
        }

      
    },

    modalidadeBike(value){
        if(!value){
            return 'Modalidade Obrigatório';
        } else {
            return true;
        }

       
    },

    precoBike(value){
        if(!value){
            return 'Preço Obrigatório';

        } else {

            return true;
        }

        
    }
}



//FORMATAR NUMERO REAL
function converterNumeroReativo(){
    // const numero = parseFloat(dadosBike.preco.replace(',','.'));
    //     const numeroFormatado = numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    //     console.log(numeroFormatado);
    var elemento = dadosBike.preco;
  var valor = elemento;
  
  valor = valor + '';
  let valorN = parseInt(valor.replace(/[\D]+/g,''));
  let valorD = valorN + '';
  let v = valorD.replace(/([0-9]{2})$/g, ",$1");

  if (v.length > 6) {
    v = v.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  
  elemento = v;
  dadosBike.preco = elemento;


}




const supabase = useSupabaseClient()
let alertSuccess = ref(false);


const route = useRoute();
const { id } = useRoute().params
//armazena o valor do Id de acordo com o nome dado na vue dinamica
let idBike = route.params.id;


//Seleciona o id da bike
const selecionarBike = async (idBike) =>{
        const { data, error } = await supabase
        .from('bike')
        .select().eq('id', idBike)

    if (error) {
        console.log('ERRO AO SELECIONAR ' + error);
    }

    //Função Javascript 
    Object.keys(data).forEach(key => {

        //atribui ao objeto dadosBike os valores
        dadosBike.id = data[key].id;
        dadosBike.nome = data[key].nome;
        dadosBike.preco = data[key].preco;
        dadosBike.modalidade = data[key].modalidade;
        dadosBike.img_bike = data[key].img_bike;
    });

console.log('Esse é o id: '+idBike);
}

selecionarBike(idBike);


//atualiza os dados
const atualizar = async () => {

//aqui verifica se ja existe uma bike cadastrada se tiver autualiza
const { error } = await supabase
        .from('bike')
        .update(dadosBike)
        .eq('id', idBike)
   


if (error) {
    console.log('NAO ATUALIZOU' + error);
    return  alertSuccess.value = false;
}else {
    console.log('ATUALIZADO com SUCESSO!');
    // limparCampos();
    return alertSuccess.value = true;
}



}


//valores reativos
const dadosBike = reactive({
    id: ref(''),
    nome: ref(''),
    preco: 0,
    modalidade:ref(''),
    img_bike:ref('')
})











const imagemBase64 = async(event)=>{

    
     dadosBike.img_bike = URL.createObjectURL(event.target.files[0]);



    const imagem = event.target.files[0];
    const reader = new FileReader();

    //quando for carregado
    reader.addEventListener("load",()=>{

        dadosBike.img_bike = reader.result;
        console.log(reader.result);
        // console.log('variavel: '+dadosBike.img_bike);
    });
    //faz a conversao em base64
    reader.readAsDataURL(imagem);

   
   
}








</script>

<template>


<div class="p-2 bg-emerald-400 h-screen">

<div class="flex justify-center items-center">


    <Form @submit="atualizar" :validation-schema="validarDadosBike" class=" w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div class="flex flex-col items-center pb-10">
            <label for="tipoFile">
                <input id="tipoFile" @change="imagemBase64" type="file"   alt="Fotos"/>
                <img :src="dadosBike.img_bike" class="mt-4 w-24 h-24 mb-3 rounded-full shadow-lg object-cover"/>
           

            </label>
            <div class="flex mt-4 space-x-3 md:mt-6">
                <div >
                    <label class="block">
                    <span class="block text-sm font-medium text-slate-700 p-2">Nome Bike</span>
                    </label>
                    <Field name="nomeBike" v-model="dadosBike.nome"  type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" placeholder="Nome Bike" required></Field>
                    <ErrorMessage name="nomeBike" class="text-sm font-medium mt-2 flex items-center p-2 mb-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                    <label class="block">
                    <span class="block text-sm font-medium text-slate-700 p-2">Modalidade</span>
                    </label>
                    <Field name="modalidadeBike" v-model="dadosBike.modalidade" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" placeholder="Modelo" required></Field>
                    <ErrorMessage name="modalidadeBike" class="text-sm font-medium mt-2 flex items-center p-2 mb-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                    <label class="block">
                    <span class="block text-sm font-medium text-slate-700 p-2">Preço</span>
                    </label>
                    <Field name="precoBike" :onkeyup="converterNumeroReativo()" v-model="dadosBike.preco" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" placeholder="Preco" required></Field>
                    <ErrorMessage name="precoBike" class="text-sm font-medium mt-2 flex items-center p-2 mb-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                 
                
                </div>
            </div>
            <div class="flex mt-4 space-x-3 md:mt-6">
                <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  @click="atualizar">Salvar</button>
                <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><NuxtLink to="/dashboard">Voltar</NuxtLink></button>
              
            </div>
            <p v-if="alertSuccess" name="email" class="mt-4 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">Atualizado com sucesso</p>
              
        </div>
    </Form>
</div>
</div>
</template>

<style scoped>
    #tipoFile{
        display: none;
    }
</style>