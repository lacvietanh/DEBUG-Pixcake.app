import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import store from '@/store'
import { RefineNavName } from '@/constants/refine'

interface IRepositories {
    activeNavName: Ref<string>
    isInCropNavbar: ComputedRef<boolean>

    restoreNavbar: () => void
    beforeRefineNavBarChange: (fromKey: string, toKey: string) => boolean
}

export default function useNavbarRepositories (navBarChange: (fromKey: string, toKey: string) => void): IRepositories {
    const cacheLastNav = ref('')
    const defaultActiveNavName = store.getters['refine/activeNavName']

    const activeNavName = ref(defaultActiveNavName)
    watch(activeNavName, (val) => store.commit('refine/_SetActiveNavName', val))

    const isInCropNavbar = computed(() => activeNavName.value === RefineNavName.Crop)

    const restoreNavbar = () => {
        activeNavName.value = cacheLastNav.value
        cacheLastNav.value = ''
    }

    const beforeRefineNavBarChange = (fromKey: string, toKey: string): boolean => {
        cacheLastNav.value = fromKey
        navBarChange && navBarChange(fromKey, toKey)
        return true
    }

    return {
        activeNavName,
        isInCropNavbar,

        restoreNavbar,
        beforeRefineNavBarChange
    }
}
