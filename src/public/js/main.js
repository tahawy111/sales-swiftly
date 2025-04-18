document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.querySelector('.theme-text');
    
    function updateTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeText.textContent = 'Light Mode';
        } else {
            document.documentElement.classList.remove('dark');
            themeText.textContent = 'Dark Mode';
        }
    }

    // Check initial theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        updateTheme(true);
    }

    themeToggle?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        updateTheme(isDark);
    });

    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');

    sidebarToggle?.addEventListener('click', () => {
        sidebar?.classList.remove('-translate-x-full');
    });

    closeSidebar?.addEventListener('click', () => {
        sidebar?.classList.add('-translate-x-full');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024 &&
            !sidebar?.contains(e.target) &&
            !sidebarToggle?.contains(e.target)) {
            sidebar?.classList.add('-translate-x-full');
        }
    });
});