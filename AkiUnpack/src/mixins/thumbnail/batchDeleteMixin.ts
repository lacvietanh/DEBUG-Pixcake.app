import { defineComponent } from 'vue'
import deleteProgressDialog from '@/views/BatchRetouch/components/deleteProgressDialog.vue'
import useBatchDeleteRepositories, { IRepositories } from '@/composables/business/useBatchDeleteRepositories'

export default defineComponent({
    components: {
        'delete-progress-dialog': deleteProgressDialog
    },
    setup(): IRepositories {
        return useBatchDeleteRepositories()
    },
    data() {
        return {
        }
    },
    mixins: [
    ],
    computed: {
    },
    methods: {
    },
    mounted() {
    }
})
