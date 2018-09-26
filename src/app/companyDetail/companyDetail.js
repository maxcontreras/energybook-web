/* eslint-disable */
import Header from '@/app/components/header/Header.vue'
import companies from '@/services/companies'
import Chart from '@/app/components/chart/Chart.vue'
import Dashboard from '@/app/dashboard/Dashboard.vue'


export default {
  components: {
    Header, Chart, Dashboard
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin
    },
    isUser() {
      return this.$store.state.isUser
    },
    isManager() {
      return this.$store.state.isManager
    },
    isAccounting() {
      return this.$store.state.isAccounting
    }
  },
  data() {
    return {
      company: {
        users: [],
        meters: []
      },
      edit: false,
      originalData: {},
      tabIndex: 0
    }
  },

  beforeMount() {
    companies.find({
      id: this.$route.params.id,
      filter: {
        include: ['users', 'meters']
      }
    }).then(company => {
      this.company = company
      this.originalData = JSON.parse(JSON.stringify(this.company))
    })
  },

  methods: {
    cancel() {
      this.edit = false
      this.company = JSON.parse(JSON.stringify(this.originalData))
    },
    saveChanges() {

    },
    addUser(user) {
      this.items.push({
        name: `${user.name} ${user.lastname}`,
        created_at: moment(user.created_at).format('LL'),
        email: user.email,
        role: user.role_id,
        status: companyStatus[user.status],
        id: user.id
      })
    },
    linkClass(idx) {
      console.log(idx, this.tabIndex)
    }
  }
}
