import { onUnmounted, Ref, ref } from 'vue'

export interface IRepositories {
    isStaying: Ref<boolean>
    onMouseEnter: (e: MouseEvent) => void
    onMouseLeave: (e: MouseEvent) => void
}

export default function useMouseStayRepositories(wait: number = 2000): IRepositories {
    const isStaying = ref(false)
    let timer = 0
    let enterTimer = 0

    const onMouseEnter = (e: MouseEvent) => {
        if (enterTimer) {
            clearTimeout(enterTimer)
        }
        timer = setTimeout(() => {
            isStaying.value = true
        }, wait)
    }

    const onMouseLeave = (e: MouseEvent) => {
        if (timer) {
            clearTimeout(timer)
            timer = 0
        }

        enterTimer = setTimeout(() => {
            isStaying.value = false
        }, 300)
    }

    onUnmounted(() => {
        if (enterTimer) {
            clearTimeout(enterTimer)
        }

        if (timer) {
            clearTimeout(timer)
            timer = 0
        }
        isStaying.value = false
    })

    return {
        isStaying,

        onMouseEnter,
        onMouseLeave
    }
}
