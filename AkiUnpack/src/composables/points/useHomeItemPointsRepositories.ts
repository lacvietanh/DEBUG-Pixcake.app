import useBaseRepositories from './useBaseRepositories'
import { PointEvent } from '@/constants/pointsDef'

interface IUseUpdatePointsRepositories {
    PointHomeItem: (operate: string) => void
    PointClickProject: (itemCount: number) => void
}

export default function useHomeItemPointsRepositories(): IUseUpdatePointsRepositories {
    const { sendPoint } = useBaseRepositories()

    function PointHomeItem(operate: string) {
        sendPoint(PointEvent.CakeWorkBench, { cake_operate: operate })
    }

    function PointClickProject(itemCount: number) {
        sendPoint(PointEvent.CakeWorkBench, { cake_operate: 'click_project', cake_number: itemCount })
    }

    return {
        PointHomeItem,
        PointClickProject
    }
}
