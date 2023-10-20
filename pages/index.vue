<script setup lang="ts">
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useStore } from '../stores/dadosUser';


const userStore = useStore();

// const supabase = useSupabaseClient();

//Validação
const validarDados = {
    email(value) {
        //Regex para validar email
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
         if(!(regexEmail.test(value)) || (value == '')){
            return 'Precisa ser um email';
           
         }

     
         //se tudo ocorrer bem retorna true
         return true;
    },

    senha(value){
        if((value.length < 6) || (value == '')){
           return 'Senha inválida';
          

        }
    
        return true;
    
    }

}


const credentials = {
    email: '',
    password: ''
}



</script>

<template>


    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    
        <Form class="space-y-6" @submit="userStore.login(credentials)" :validation-schema="validarDados">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white flex justify-center">Nuxt Bike</h5>
            <div>
            
                <Field name="email" v-model="credentials.email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
                </Field>
                
                <ErrorMessage name="email" class="text-sm font-medium mt-4 flex items-center p-2 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                  
                </div>
            <div>

            
                <Field name="senha" v-model="credentials.password" type="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </Field>
                
                <ErrorMessage name="senha" class="text-sm font-medium mt-4 flex items-center p-2 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"/>
                  
            </div>
        
            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrar</button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Não tem uma conta? <NuxtLink class="text-blue-700 hover:underline dark:text-blue-500" to="/cadastrar">Cadastre-se</NuxtLink>
            </div>
        </Form>
    </div>




</template>

<style lang="scss" scoped></style>