
const baseURL = "https://restopinionpoll.azurewebsites.net/api/Questions";

Vue.createApp({
    data(){
        return {
            questions: [],
            searchQuery: "",
            filteredQuestions: [],
            newQuestion: { questionText: "", category: "", option1: "", option2: "", option3: "", option1Count: 0, option2Count: 0, option3Count: 0, active: 0},
            addMessage: "",
            selectedCategory: ""
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
                this.filteredQuestions = this.questions;
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
        async searchQuestion(event) {
            event.preventDefault();
        
            try {
                if (this.searchQuery) {
                    this.filteredQuestions = this.questions.filter(question =>
                        question.questionText.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        question.category.toLowerCase().includes(this.searchQuery.toLowerCase())
                    );
                } else {
                    this.filteredQuestions = this.questions;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}).mount("#app")