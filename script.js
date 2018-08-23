new Vue({
  el: "#app",
  data: {
    day: null,
    month: null,
    year: null,
    DOB: localStorage.getItem("DOB"),
    error: false
  },
  computed: {
    daysLeft() {
      const DOB = moment(this.DOB, "DD-MM-YYYY").startOf("day");
      if (!DOB.isValid()) this.clearDOB();
      const today = moment().startOf("day");
      const year = moment(DOB)
        .year(today.year())
        .startOf("day")
        .isSameOrAfter(today)
        ? today.get("year")
        : today.get("year") + 1;
      const nextBirthday = moment(DOB, "DD-MM-YYYY").set("year", year);

      return nextBirthday.diff(today, "days");
    }
  },
  methods: {
    setDOB() {
      const DOB = `${this.day}-${this.month}-${this.year}`;
      if (moment(DOB, "DD-MM-YYYY").isValid()) {
        this.error = false;
        this.DOB = DOB;
        localStorage.setItem("DOB", DOB);
      } else this.error = true;
    },
    clearDOB() {
      this.DOB = null;
      localStorage.removeItem("DOB");
    }
  }
});
