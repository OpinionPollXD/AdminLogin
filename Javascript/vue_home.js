
const baseURL = "https://restopinionpoll.azurewebsites.net/api/Questions";

Vue.createApp({
    data(){
        return {
            questions: [],
            newQuestion: "",
        }
    }, 
    created() {
        this.getAllQuestions(baseURL);
    },
    methods: {  
        async getAllQuestions(url) {
            try {
                const response = await axios.get(url);
                this.questions = await response.data;
                console.log(this.questions);
            }
            catch (error) {
                alert(error.message);
                console.log(error);
            }

        },
    }
}).mount("#app")