/**
 * GlucoScan Community Buttons Integration
 * Fügt Floating Button und Menü-Button zur bestehenden App hinzu
 */

(function() {
    'use strict';
    
    // Warte bis die App geladen ist
    function waitForApp() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCommunityButtons);
        } else {
            initCommunityButtons();
        }
    }
    
    function initCommunityButtons() {
        console.log('[GlucoScan Community] 🚀 Initialisiere Community-Buttons...');
        
        // Warte auf React-App
        setTimeout(() => {
            createFloatingButton();
            observeUserMenu();
        }, 2000);
    }
    
    // ===== FLOATING COMMUNITY BUTTON =====
    function createFloatingButton() {
        // Prüfe ob Button bereits existiert
        if (document.getElementById('glucoscan-community-floating')) {
            return;
        }
        
        console.log('[GlucoScan Community] 🎯 Erstelle Floating Button...');
        
        // Erstelle Floating Button
        const floatingButton = document.createElement('div');
        floatingButton.id = 'glucoscan-community-floating';
        floatingButton.innerHTML = `
            <div class="community-floating-content">
                <span class="community-icon">👥</span>
                <span class="community-text">Community</span>
            </div>
        `;
        
        // Floating Button Styles
        const floatingStyles = `
            #glucoscan-community-floating {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 50px;
                padding: 12px 20px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-weight: 600;
                font-size: 14px;
                border: none;
                backdrop-filter: blur(10px);
                user-select: none;
                animation: communityPulse 3s infinite;
            }
            
            #glucoscan-community-floating:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
                background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            }
            
            #glucoscan-community-floating:active {
                transform: translateY(-1px) scale(1.02);
            }
            
            .community-floating-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .community-icon {
                font-size: 16px;
                animation: communityBounce 2s infinite;
            }
            
            .community-text {
                font-weight: 600;
                letter-spacing: 0.5px;
            }
            
            @keyframes communityPulse {
                0%, 100% { 
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
                }
                50% { 
                    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
                }
            }
            
            @keyframes communityBounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-3px);
                }
                60% {
                    transform: translateY(-1px);
                }
            }
            
            /* Mobile Responsive */
            @media (max-width: 768px) {
                #glucoscan-community-floating {
                    bottom: 15px;
                    right: 15px;
                    padding: 10px 16px;
                    font-size: 13px;
                }
                
                .community-icon {
                    font-size: 14px;
                }
            }
        `;
        
        // Füge Styles hinzu
        addStyles(floatingStyles, 'community-floating-styles');
        
        // Event Listener
        floatingButton.addEventListener('click', function() {
            console.log('[GlucoScan Community] 🎯 Floating Button geklickt!');
            openCommunityForum('floating_button');
        });
        
        // Füge Button zur Seite hinzu
        document.body.appendChild(floatingButton);
        
        console.log('[GlucoScan Community] ✅ Floating Button erstellt!');
    }
    
    // ===== BENUTZERMENÜ COMMUNITY BUTTON =====
    function observeUserMenu() {
        console.log('[GlucoScan Community] 👀 Überwache Benutzermenü...');
        
        // Observer für dynamische Inhalte
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    checkForUserMenu();
                }
            });
        });
        
        // Starte Observer
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Initiale Prüfung
        checkForUserMenu();
    }
    
    function checkForUserMenu() {
        // Suche nach Benutzermenü-Elementen
        const userMenuSelectors = [
            '[class*="dropdown"]',
            '[class*="menu"]',
            '[class*="user"]',
            'div[role="menu"]',
            'ul[role="menu"]',
            '.MuiMenu-root',
            '.MuiPopover-root'
        ];
        
        userMenuSelectors.forEach(selector => {
            const menus = document.querySelectorAll(selector);
            menus.forEach(menu => {
                if (menu && menu.offsetParent !== null && !menu.querySelector('.community-menu-button')) {
                    // Prüfe ob es ein Benutzermenü ist
                    const menuText = menu.textContent.toLowerCase();
                    if (menuText.includes('einstellung') || 
                        menuText.includes('abmelden') || 
                        menuText.includes('profil') ||
                        menuText.includes('konto') ||
                        menuText.includes('premium')) {
                        addCommunityMenuButton(menu);
                    }
                }
            });
        });
    }
    
    function addCommunityMenuButton(menu) {
        console.log('[GlucoScan Community] 🎯 Füge Community-Button zum Menü hinzu...');
        
        // Erstelle Community Menu Button
        const communityMenuItem = document.createElement('div');
        communityMenuItem.className = 'community-menu-button';
        communityMenuItem.innerHTML = `
            <div class="community-menu-content">
                <span class="community-menu-icon">👥</span>
                <span class="community-menu-text">Community Forum</span>
                <span class="community-menu-arrow">→</span>
            </div>
        `;
        
        // Menu Button Styles
        const menuStyles = `
            .community-menu-button {
                padding: 12px 16px;
                cursor: pointer;
                transition: all 0.2s ease;
                border-radius: 8px;
                margin: 4px 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-weight: 500;
                font-size: 14px;
                border: none;
                user-select: none;
            }
            
            .community-menu-button:hover {
                background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                transform: translateX(2px);
                box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
            }
            
            .community-menu-content {
                display: flex;
                align-items: center;
                gap: 10px;
                justify-content: space-between;
            }
            
            .community-menu-icon {
                font-size: 16px;
                flex-shrink: 0;
            }
            
            .community-menu-text {
                flex-grow: 1;
                font-weight: 600;
                letter-spacing: 0.3px;
            }
            
            .community-menu-arrow {
                font-size: 12px;
                opacity: 0.7;
                transition: transform 0.2s ease;
            }
            
            .community-menu-button:hover .community-menu-arrow {
                transform: translateX(2px);
                opacity: 1;
            }
        `;
        
        // Füge Styles hinzu
        addStyles(menuStyles, 'community-menu-styles');
        
        // Event Listener
        communityMenuItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('[GlucoScan Community] 🎯 Menu Button geklickt!');
            openCommunityForum('menu_button');
        });
        
        // Füge Button zum Menü hinzu
        const firstChild = menu.firstElementChild;
        if (firstChild) {
            menu.insertBefore(communityMenuItem, firstChild);
        } else {
            menu.appendChild(communityMenuItem);
        }
        
        console.log('[GlucoScan Community] ✅ Community-Button zum Menü hinzugefügt!');
    }
    
    // ===== COMMUNITY FORUM ÖFFNEN =====
    function openCommunityForum(source) {
        const forumUrl = 'https://zpzwcpzd.manus.space';
        
        console.log(`[GlucoScan Community] 🚀 Öffne Community Forum (${source} )`);
        
        // Analytics Event (falls verfügbar)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'community_access', {
                'event_category': 'engagement',
                'event_label': source,
                'value': 1
            });
        }
        
        // Öffne Forum in neuem Tab
        const newWindow = window.open(forumUrl, '_blank', 'noopener,noreferrer');
        
        // Fallback falls Popup blockiert
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            console.log('[GlucoScan Community] ⚠️ Popup blockiert, verwende Fallback...');
            window.location.href = forumUrl;
        }
    }
    
    // ===== UTILITY FUNKTIONEN =====
    function addStyles(css, id) {
        if (document.getElementById(id)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    // ===== INITIALISIERUNG =====
    console.log('[GlucoScan Community] 🎉 Community Buttons Script geladen!');
    waitForApp();
    
    // Periodische Prüfung für dynamische Inhalte
    setInterval(() => {
        if (!document.getElementById('glucoscan-community-floating')) {
            createFloatingButton();
        }
        checkForUserMenu();
    }, 5000);
    
})();
