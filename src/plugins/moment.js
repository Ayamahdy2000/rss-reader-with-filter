import app from "vue";
import VueMoment from "vue-moment"
import moment from "moment-timezone"
moment.tz.setDefault(
    "Africa/Cairo");

    app.use(VueMoment, {
    moment,
})