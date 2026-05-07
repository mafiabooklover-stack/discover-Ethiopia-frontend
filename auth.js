// ===== Auth helpers shared by all pages =====

function getToken() {
    return localStorage.getItem('de_token');
}

function getUser() {
    const u = localStorage.getItem('de_user');
    return u ? JSON.parse(u) : null;
}

function saveAuth(token, user) {
    localStorage.setItem('de_token', token);
    localStorage.setItem('de_user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('de_token');
    localStorage.removeItem('de_user');
    window.location.href = 'index.html';
}

function togglePassword(id) {
    const input = document.getElementById(id);
    const btn = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Render login/register or username+logout links into a given container element
function renderAuthNav(container) {
    if (!container) return;
    const user = getUser();
    if (user) {
        container.innerHTML = `
            <span class="nav-user"><i class="fas fa-user-circle"></i> ${user.name.split(' ')[0]}</span>
            <a href="#" class="nav-logout" onclick="logout(); return false;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        `;
    } else {
        container.innerHTML = `
            <a href="login.html" class="nav-auth-link"><i class="fas fa-sign-in-alt"></i> Login</a>
            <a href="register.html" class="nav-auth-btn btn-small">Register</a>
        `;
    }
}
