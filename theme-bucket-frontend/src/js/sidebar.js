const openSidebarButton = document.getElementById('open-sidebar')
const closeSidebarButton = document.getElementById('close-sidebar')
const sidebar = document.getElementById('sidebar')

openSidebarButton.addEventListener('click', () => {
    sidebar.style.opacity = '1'
    sidebar.style.transform = 'translateX(0)'
    sidebar.style.scale = '1'
})

closeSidebarButton.addEventListener('click', () => {
    sidebar.style.opacity = '0.5'
    sidebar.style.transform = 'translateX(110%)'
    sidebar.style.scale = '0.9'
})