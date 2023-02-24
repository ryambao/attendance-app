<template>
  <div>
    <SignIn v-if="!toggleForm" :toggle="toggle" :signIn="signIn" />
    <SignUp v-if="toggleForm" :toggle="toggle" :signUp="signUp" />
  </div>
</template>
<script>
import SignIn from '../components/user/signIn.vue';
import SignUp from '../components/user/signUp.vue';
export default {
  layout: 'LoginLayout',
  components: { SignIn, SignUp },
  data() {
    return {
      toggleForm: false,
    };
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/profile');
      }
    })
  },
  methods: {
    signIn(user) {
      this.$fire.auth.signInWithEmailAndPassword(user.email, user.password)
      // .then(()=> {
      //   this.send();
      //   console.log('wewewe')
      // })
        .catch((error) => {
          console.error('Error in signing user: ', error.code, error.message);
        });

    },
    signUp(user) {
      this.$fire.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          this.$fire.database.ref(`users/${userCredential.user.uid}`).set({
            // Add user credentials
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          });
          this.$router.push('/profile');
        })
        .catch((error) => {
          console.error('Error in creating user: ', error.code, error.message);
        });
    },
    toggle() {
      this.toggleForm = !this.toggleForm;
    },
    send() {
      this.$mail.send({
        from: this.email,
        subject: 'Contact form message',
        text: this.message,
      })
    }
  },
}
</script>
<style>
html,
body {
  text-align: center;
}

.card {
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  max-width: 420px;
  text-align: center;
  margin: 0 auto;
}
</style>
