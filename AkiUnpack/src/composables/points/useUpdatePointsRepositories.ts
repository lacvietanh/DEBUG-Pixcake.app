import useBaseRepositories from './useBaseRepositories'

interface IUseUpdatePointsRepositories {
    PointDataUpgrade: () => void
    PointChooseUpgrade: () => void
    PointChooseQuitUpgrade: () => void
}

export default function useUpdatePointsRepositories(): IUseUpdatePointsRepositories {
    const { sendPoint } = useBaseRepositories()

    return {
        PointDataUpgrade: () => sendPoint('cake_data_upgrade'),
        PointChooseUpgrade: () => sendPoint('cake_choose_upgrade'),
        PointChooseQuitUpgrade: () => sendPoint('cake_choose_quit')
    }
}
