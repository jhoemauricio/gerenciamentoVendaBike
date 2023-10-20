import { defineStore } from 'pinia'




export const useStore = defineStore('storeId', {

    

    // arrow function recommended for full type inference
    state: () => reactive({

        dados: ''
       
    }),

    actions: {


        //Login de usuário
        async login(credentials) {

           const supabase = useSupabaseClient();

            const { data, error } = await supabase.auth.signInWithPassword(credentials)

            if (error) {

                console.log('Deu erro ' + error.status);
                const tipoErro = error.status;

            }

            this.dados = credentials;
            // console.log('LOGADO '+this.dados);
            return navigateTo('/dashboard/');

        },

        //logout usuário
        async logout() {

            const supabase = useSupabaseClient();

            const { error } = await supabase.auth.signOut()

            if (error) {

                console.log('Algo errado o sair ' + error);

            }

            return navigateTo('/');

        },

        

    },



    getters: {
        nomeUsuario(state) {

            return state.dados;
        }
    }


})