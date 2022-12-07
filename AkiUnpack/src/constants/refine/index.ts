export enum RefineNavName {
    Palette = 'color',
    Beauty = 'beauty',
    Background = 'background',
    History = 'history',
    Crop = 'crop',
    Liquefy = 'liquefy'
}

export enum SelectTypeEnum {
    Default = 0,
    Spec = 1,
    All = 2,
    Cancel = 3,
    Custom = -1
}

export enum CropType {
    Default = 0, // 原图比例
    Radio = 1, // 自定义比例
    DefaultIdPhoto = 2, // 默认证件照尺寸
    RecommendIdPhoto = 3, // 推荐证件照尺寸
    FixedRatio = 4
}
