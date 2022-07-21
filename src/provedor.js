import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'

Vue.use(Vuex)

const estado = {
    token: null,
    usuario: {},
    darkMode: false,

}

const mutations = {
    DEFINIR_USUARIO_LOGADO (state, { token, usuario }){
        state.token = token
        state.usuario = usuario 
    },
    DESLOGAR_USUARIO(state){
        state.token = null
        state.usuario = {}
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
                        token: response.data.access_token,
                        usuario: response.data.user
                      })
                      resolve(response.data)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
      fetchUser(ctx, { id }) {
        return new Promise((resolve, reject) => {
          http.get(`/users/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
      UpdateUser(ctx, { id }) {
        return new Promise((resolve, reject) => {
          http.patch(`/users/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
}
export default new Vuex.Store({
    state: estado,  
    mutations,
    actions
})