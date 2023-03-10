<template>
  <div class="min-h-screen">
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>In</th>
          <th>Out</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in userLogs" :key="index">
          <td>{{ data[0] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      currentUser: null,
      userLogs: {}
    }
  },
  mounted() {
    this.recordsRefKey = localStorage.getItem("records");
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        console.log(this.currentUser.uid);
        // User is signed in
        const userRef = this.$fire.database.ref(`users/${user.uid}`);

        userRef.on("value", (snapshot) => {
          this.currentUser = {
            uid: user.uid,
            ...snapshot.val(),
          };
        });
        this.getRecords();
      } else {
        // User is signed out
        this.$router.push("/");
      }
    });

  },
  methods: {
    getRecords() {
    const id = this.currentUser.uid
    const userRef = this.$fire.database.ref("records");
    const filteredData = {};
    userRef.on("value", function(snapshot) {
    const userData = snapshot.val();

    // const datesWithUserId = [];
      // Object.keys(userData).forEach(date => {

      // if (userData[date][id]) {
      //   datesWithUserId.push({ [date]: userData[date] });
      // }
      // });
      // console.log(datesWithUserId)



      Object.keys(userData).forEach((obj) => {
        const entries = Object.entries(userData[obj]);
        const filteredEntries = entries.filter(([key]) => key === id);
        if (filteredEntries.length > 0) {
          filteredData[obj] = Object.fromEntries(filteredEntries);
        }
      });
    });
    this.userLogs = Object.entries(filteredData)
      console.log(this.userLogs)
    }
  }

}
</script>
<style>
table {
  border-collapse: collapse;
}
td, th {
  border: 1px solid #ddd;
}
</style>
