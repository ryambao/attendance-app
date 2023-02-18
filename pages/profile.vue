<template>
  <div class="card">
    <h1>Hello {{ displayName }}!</h1>
    <p>time duration: {{ timer }}</p>

    <div v-if="records && records.clockIn">
      <p>Clock In</p>

      <span>{{ records.clockIn }}</span>
    </div>

    <div v-if="records && records.clockOut">
      <p>Clock Out</p>

      <span>{{ records.clockOut }}</span>
    </div>

    <div>
      <button v-if="!this.recordsRefKey" @click="clockIn">Clock In</button>

      <button v-if="this.recordsRefKey" @click="clockOut">Clock Out</button>

      <button
        v-if="this.recordsRefKey"
        @click="!isBreakTime ? timerBreak() : timerStart()"
      >
        {{ !isBreakTime ? "Break" : "Resume" }}
      </button>

      <button @click="signOut">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: null,
      recordsRefKey: null,
      currentUser: null,
      timer: "00 : 00 : 00",
      interval: null,
      isBreakTime: false,
      seconds: 0,
    };
  },

  mounted() {
    this.recordsRefKey = localStorage.getItem("records");

    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;

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

  computed: {
    displayName: {
      get() {
        if (!this.currentUser) return;
        return this.currentUser.firstName + " " + this.currentUser.lastName;
      },

      set(newVal) {
        newVal;
      },
    },
  },

  methods: {
    clockIn() {
      const date = new Date();
      const today = date.toLocaleDateString().replace(/\//g, "-");
      const time = date.toLocaleTimeString("en-US", { hour12: false });

      const postData = {
        displayName: this.displayName,
        clockIn: time,
        clockOut: null,
      };

      this.recordsRefKey = this.$fire.database
        .ref()
        .child(`records/${today}/${this.currentUser.uid}`)
        .push("test").key;
      const updates = {};
      updates[
        `/records/${today}/${this.currentUser.uid}/${this.recordsRefKey}`
      ] = postData;

      this.$fire.database.ref().update(updates);
      localStorage.setItem("records", this.recordsRefKey);

      // get current record
      this.getRecords();
      this.timerReset();
      this.timerStart();
    },

    clockOut() {
      const date = new Date();
      const today = date.toLocaleDateString().replace(/\//g, "-");
      const time = date.toLocaleTimeString("en-US", { hour12: false });

      const recordsRefKey = localStorage.getItem("records");
      this.$fire.database
        .ref(`records/${today}/${this.currentUser.uid}/${recordsRefKey}`)
        .update({ clockOut: time });
      this.recordsRefKey = localStorage.removeItem("records");

      this.timerBreak();
    },

    getRecords() {
      const date = new Date();
      const today = date.toLocaleDateString().replace(/\//g, "-");
      const recordsRef = this.$fire.database.ref(
        `records/${today}/${this.currentUser.uid}/${this.recordsRefKey}`
      );

      recordsRef.on("value", (snapshot) => {
        this.records = JSON.parse(JSON.stringify(snapshot.val()));
      });
    },

    signOut() {
      this.$fire.auth.signOut();
    },

    // showClock(){
    //   const date = new Date();
    //   let h = date.getHours(); // 0 - 23
    //   let m = date.getMinutes(); // 0 - 59
    //   let s = date.getSeconds(); // 0 - 59

    //   h = (h < 10) ? "0" + h : h;
    //   m = (m < 10) ? "0" + m : m;
    //   s = (s < 10) ? "0" + s : s;

    //   const time = `${h}:${m}:${s}`;

    //   this.clock = time;

    //   setTimeout(this.showClock, 1000);
    // }

    timerStart() {
      this.isBreakTime = false;
      this.interval = setInterval(() => {
        this.seconds++;

        let hrs = Math.floor(this.seconds / 3600);
        let mins = Math.floor((this.seconds - hrs * 3600) / 60);
        let secs = this.seconds % 60;

        if (secs < 10) secs = `0${secs}`;
        if (mins < 10) mins = `0${mins}`;
        if (hrs < 10) hrs = `0${hrs}`;

        this.timer = `${hrs} : ${mins} : ${secs}`;
      }, 1000);
    },

    timerBreak() {
      this.isBreakTime = true;
      clearInterval(this.interval);
      this.interval = null;
    },

    timerReset() {
      this.timerBreak();
      this.seconds = 0;
      this.timer = "00 : 00 : 00";
    },
  },
};
</script>
