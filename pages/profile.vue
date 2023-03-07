<template>
  <!-- main container -->
  <div class="bg-gray-300 flex items-center justify-center h-screen">
    <!-- content -->
    <div class="bg-white p-6 rounded-lg w-6/12 drop-shadow-md">
      <!-- header -->
      <header class="flex justify-between">
        <p class="text-4xl">
          Hello <span class="font-bold">{{ displayName }}!</span>
        </p>

        <button title="Log out" @click="signOut">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z"
            />
          </svg>
        </button>
      </header>

      <!-- time -->
      <div class="flex-col text-start text-xl">
        <p class="mt-5">time duration: {{ timer }}</p>

        <p class="mt-5" v-if="records && records.clockIn">
          Clock In: <span class="font-medium">{{ records.clockIn }}</span>
        </p>

        <p class="mt-5" v-if="records && records.clockOut">
          Clock Out <span class="font-medium">{{ records.clockOut }}</span>
        </p>
      </div>

      <!-- buttons -->
      <div class="flex justify-end mt-5 bg-green">
        <button
          class="bg-green-600 ml-2 p-2 rounded-lg font-medium text-white drop-shadow"
          v-if="!this.recordsRefKey"
          @click="clockIn"
        >
          Clock In
        </button>

        <button
          class="bg-green-600 ml-2 p-2 rounded-lg font-medium text-white drop-shadow"
          v-if="this.recordsRefKey"
          @click="!isBreakTime ? timerBreak() : timerStart()"
        >
          {{ !isBreakTime ? "Break" : "Resume" }}
        </button>

        <button
          class="bg-red-600 ml-2 p-2 rounded-lg font-medium text-white drop-shadow"
          v-if="this.recordsRefKey"
          @click="clockOut"
        >
          Clock Out
        </button>
      </div>
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

      this.timerBreak();

      const recordsRefKey = localStorage.getItem("records");
      this.$fire.database
        .ref(`records/${today}/${this.currentUser.uid}/${recordsRefKey}`)
        .update({ clockOut: time, timeDuration: this.timer });
      this.recordsRefKey = localStorage.removeItem("records");
    },

    getRecords() {
      const date = new Date();
      const today = date.toLocaleDateString().replace(/\//g, "-");
      const recordsRef = this.$fire.database.ref(
        `records/${today}/${this.currentUser.uid}/${this.recordsRefKey}`
      );

      console.log("RecordsRef: ", recordsRef);

      recordsRef.on("value", (snapshot) => {
        this.records = JSON.parse(JSON.stringify(snapshot.val()));
      });

      console.log("records: ", this.records);
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
