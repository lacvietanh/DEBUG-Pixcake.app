export default (iconName: string, theme = 'dark'): any => {
    if (theme === 'dark') {
        return require(`@/assets/icons/dark/${ iconName }`)
    } else if (theme === 'common') {
        return require(`@/assets/icons/${ iconName }`)
        // return require(`@/assets/icons/light/${iconName}`)
    }
}
