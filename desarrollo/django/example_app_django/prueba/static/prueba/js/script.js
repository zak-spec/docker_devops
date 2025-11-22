// JavaScript principal de la aplicación

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación cargada');

    // ===== User Dropdown Enhancement =====
    const userDropdown = document.getElementById('userDropdown');
    const dropdownMenu = document.querySelector('.user-dropdown-menu');
    
    if (userDropdown && dropdownMenu) {
        // Agregar efecto de hover
        userDropdown.addEventListener('mouseenter', function() {
            this.classList.add('show');
            dropdownMenu.classList.add('show');
        });

        // Mantener abierto al pasar sobre el menú
        dropdownMenu.addEventListener('mouseenter', function() {
            this.classList.add('show');
            userDropdown.classList.add('show');
        });

        // Cerrar al salir
        userDropdown.addEventListener('mouseleave', function(e) {
            setTimeout(() => {
                if (!dropdownMenu.matches(':hover')) {
                    this.classList.remove('show');
                    dropdownMenu.classList.remove('show');
                }
            }, 200);
        });

        dropdownMenu.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!userDropdown.matches(':hover')) {
                    this.classList.remove('show');
                    userDropdown.classList.remove('show');
                }
            }, 200);
        });

        // Animación de items del dropdown
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item-custom');
        dropdownItems.forEach((item, index) => {
            item.style.animation = `fadeInLeft 0.3s ease-out ${index * 0.05}s`;
            item.style.animationFillMode = 'both';
        });
    }

    // ===== Validación adicional del formulario =====
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const password1 = document.querySelector('input[name="password1"]');
            const password2 = document.querySelector('input[name="password2"]');
            
            if (password1 && password2) {
                if (password1.value !== password2.value) {
                    e.preventDefault();
                    showNotification('Las contraseñas no coinciden', 'error');
                    return false;
                }
            }
        });
    }

    // ===== Auto-cerrar alertas =====
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s, transform 0.5s';
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Navbar scroll effect =====
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.boxShadow = '';
                navbar.style.padding = '';
            }
            
            lastScroll = currentScroll;
        });
    }
});

// ===== Función para mostrar notificaciones =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transition = 'opacity 0.5s, transform 0.5s';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ===== Animación CSS adicional =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
