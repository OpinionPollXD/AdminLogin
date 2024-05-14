
const baseURL = "https://restopinionpoll.azurewebsites.net/api/Questions";

Vue.createApp({
    data(){
        return {
            questions: [],
            newQuestion: { questionText: "", category: "", option1: "", option2: "", option3: "", option1Count: 0, option2Count: 0, option3Count: 0 },
            addMessage: "",
            updateData: null,
            updateMessage: ""

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
        async addQuestion() {
            try{
                response = await axios.post(baseURL, this.newQuestion)
                this.addMessage = " response " + response.status + " " + response.statusText
                this.getAllQuestions(baseURL);
            }
            catch (error) {
                alert(error.message);
                console.log(error);
            }
        },
        async setChosenQuestion(question){
            this.updateData = question;
        },
        async updateQuestion(){
            const url = baseURL + "/" + this.updateData.questionId;
            console.log(this.updateData);
            try{
                const response = await axios.put(url, this.updateData)
                this.updateMessage = " response " + response.status + " " + response.statusText
                this.getAllQuestions(baseURL);
            }
            catch (error) {
                alert(error.message);
                console.log(error);
            }
        }
    }
}).mount("#app")