import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'

Vue.use(Vuex)

const estado = {
    token: null,
    darkMode: false,

}

const mutations = {
    DEFINIR_USUARIO_LOGADO (state, { token }){
        state.token = token 
    },
    DESLOGAR_USUARIO(state){
        state.token = null
    },
    toggleDarkMode(state) {
        state.darkMode = !state.darkMode;
      },
}

const actions = {
    efetuarLogin({ commit }, usuario){
        return new Promise((resolve, reject) => {
            http.post('/login', usuario)
                .then(response => {
                    commit('DEFINIR_USUARIO_LOGADO', {
                        token: response.data.access_token
                      })
                      resolve(response.data)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}
export default new Vuex.Store({
    state: estado,  
    mutations,
    actions
})