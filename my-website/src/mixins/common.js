export default function fetchData(dataValue=[]) {
    return {
        data() {
            return {
                data: dataValue,
                isLoading: true,
            }
        },
        async created() {
            this.data = await this.fetchData();
            console.log(this.data,789)
            this.isLoading = false;
        },
    }
}