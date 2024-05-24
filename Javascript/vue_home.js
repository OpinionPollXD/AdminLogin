
const baseURL = "https://restopinionpoll.azurewebsites.net/api/Questions";

Vue.createApp({
    data(){
        return {
            questions: [],
            searchQuery: "",
            filteredQuestions: [],
            newQuestion: { questionText: "", category: "", option1: "", option2: "", option3: "", option1Count: 0, option2Count: 0, option3Count: 0, active: false },
            addMessage: "",
            updateData: null,
            updateMessage: "",
            deleteMessage: "",
            deleteId: 0,
            sortAscending: true

        }
    }, 
    created() {
        this.getAllQuestions(baseURL);
    },
    methods: {  
        async getAllQuestions(url) {
            try {
                const response = await axios.get(url);
                this.questions = response.data.map(question => ({
                    ...question,
                    active: !!question.active  // Convert to boolean in case it's a truthy/falsy value
                }));
                this.filteredQuestions = [...this.questions];
            } catch (error) {
                console.log(error);
            }
        },
        //  async getAllQuestions(url) {
        //      try {
        //          const response = await axios.get(url);
        //          this.questions = await response.data;
        //          this.filteredQuestions = this.questions;
        //          console.log(this.questions);
        //      }
        //      catch (error) {
        //          alert(error.message);
        //          console.log(error);
        //      }

        //  },
        // async addQuestion() {
        //     try{
        //         console.log(this.newQuestion);
        //         const response = await axios.post(baseURL, this.newQuestion)
        //         this.addMessage = " response " + response.status + " " + response.statusText
        //         await this.getAllQuestions(baseURL);
        //         this.newQuestion = {};
        //     }
        //     catch (error) {
        //         alert(error.message);
        //         console.log(error);
        //     }
        // },
        async addQuestion() {
            try{
                console.log(this.newQuestion);
                const response = await axios.post(baseURL, this.newQuestion)
                this.addMessage = " response " + response.status + " " + response.statusText
                await this.getAllQuestions(baseURL);
                this.newQuestion = { questionText: "", category: "", option1: "", option2: "", option3: "", option1Count: 0, option2Count: 0, option3Count: 0, active: false };
            }
            catch (error) {
                alert(error.message);
                console.log(error);
            }
        },
        // async setChosenQuestion(question){
        //     this.updateData = question;
        // },
        setChosenQuestion(question) {
            // Find the question in the questions array
            const chosenQuestion = this.questions.find(q => q.questionId === question.questionId);
        
            // Use the found question
            this.chosenQuestion = chosenQuestion;
            this.updateData = chosenQuestion;
        },
        async setChosenDeleteId(deleteId){
            this.deleteId = deleteId;
        },
        // async updateQuestion(){
        //     const url = baseURL + "/" + this.updateData.questionId;
        //     console.log(this.updateData);
        //     try{
        //         const response = await axios.put(url, this.updateData)
        //         this.updateMessage = " response " + response.status + " " + response.statusText
        //         await this.getAllQuestions(baseURL);
        //     }
        //     catch (error) {
        //         alert(error.message);
        //         console.log(error);
        //     }
        // },

        // async updateQuestion(){
        //     const url = baseURL + "/" + this.updateData.questionId;
        //     console.log(this.updateData);
        //     try{
        //         const response = await axios.put(url, this.updateData)
        //         this.updateMessage = " response " + response.status + " " + response.statusText
        
        //         // Find the updated question in the list and replace it with the updated data
        //         const index = this.questions.findIndex(question => question.questionId === this.updateData.questionId);
        //         if (index !== -1) {
        //             this.questions.splice(index, 1, response.data);
        //         }
        
        //         // Reset updateData
        //         this.updateData = { questionText: "", category: "", option1: "", option2: "", option3: "", option1Count: 0, option2Count: 0, option3Count: 0, active: false };
        //     }
        //     catch (error) {
        //         alert(error.message);
        //         console.log(error);
        //     }
        // },
        async updateQuestion(question) {
            const url = `${baseURL}/${question.questionId}`;
            const response = await axios.put(url, question);
            const index = this.questions.findIndex(q => q.questionId === question.questionId);
            if (index !== -1) {
                this.questions.splice(index, 1, response.data);
            }
        },

        async deleteQuestion(deleteId){
            this.deleteId = deleteId;
            const url = baseURL + "/" + deleteId;
            console.log(this.deleteId);
            try{
                const response = await axios.delete(url);
                this.deleteMessage = " response " + response.status + " " + response.statusText
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
        },
        toggleActive(question) {
            question.active = !question.active;
            this.updateQuestion(question);
        },
        updateUpdateData(question) {
            this.updateData = { ...question };
        }
    }
}).mount("#app")