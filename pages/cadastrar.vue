<script setup lang="ts">
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue'

onMounted(() => {
    initFlowbite()
})


const validarDados = {

    nome(value){
        
        if(value == ''){

             return 'Nome Obrigatório';
   
        }

        return true;
    }, 

    email(value) {
        //Regex para validar email
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
         if(!(regexEmail.test(value)) || (value == '')){
         
             return 'Email inválido';
           
         }

         //se tudo ocorrer bem retorna true
         return true;
    },

    senha(value){
        if((value.length < 6) || (value == '')){
        //    return alertaSenha.value = true;
            return 'Senha Precisa no minímo 6 caracteres';

        }
     
        return true;
    
    }

}




const supabase = useSupabaseClient();

let nome = '';
let email = '';
let password = '';

let alertSuccess = ref(false);


const cadastrar = async () => {

    const { data, error } = await supabase.auth.signUp({

        email: email,
        password: password,

        //este é criado dentro do meta_data do supabase
        options: {
            data: {

                nome_profile: nome

            }
        }
    })

    if (error) {

        console.log('Esse é o erro da autenticacao ' + error);
    }

   

    console.log('SUCCESS');
    return alertSuccess.value = true;
    // cadastrarDados()

    // return navigateTo('/');

}






</script>

<template>

 
   
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <Form @submit="cadastrar" class="space-y-6" :validation-schema="validarDados">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white flex justify-center">Nuxt Bike</h5>
                <div>

                    <Field name="nome" v-model="nome" type="text" id="nome" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Nome" required></Field>
                    <ErrorMessage name="nome" class=" text-sm font-medium mt-4 flex items-center p-2 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                    
                    
                    
                </div>
                <div>

                    <Field name="email" v-model="email" type="email"  id="email" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com" required></Field>
                    
                        <ErrorMessage name="email" class=" text-sm font-medium mt-4 flex items-center p-2 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                    
                    
                </div>
                <div>
                    <Field name="senha" v-model="password" type="password"  id="password" placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required></Field>
                    
                        <ErrorMessage name="senha" class=" text-sm font-medium mt-4 flex items-center p-2 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                    
                        
                    
                </div>

                <button   type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirmar</button>

                <p v-if="alertSuccess" name="email" class=" p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">Cadastrado! te enviamos um email</p>
                    
            </Form>

        </div>

   



</template>

<style lang="scss" scoped></style>