// Instabids Chat Widget Loader
(function() {
    // Prevent multiple loads
    if (window.InstabidsChat) return;
    
    window.InstabidsChat = {
        // Configuration
        config: {
            botUrl: window.INSTABIDS_BOT_URL || 'http://localhost:8000',
            position: window.INSTABIDS_POSITION || 'bottom-right',
            primaryColor: window.INSTABIDS_COLOR || '#4A90E2',
            title: window.INSTABIDS_TITLE || 'Sales Assistant'
        },
        
        // Load the widget
        load: function() {
            // Create container
            const container = document.createElement('div');
            container.id = 'instabids-widget-container';
            container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;';
            
            // Create iframe
            const iframe = document.createElement('iframe');
            iframe.src = this.getWidgetUrl();
            iframe.style.cssText = 'width: 450px; height: 700px; border: none; max-width: 100vw; max-height: 100vh;';
            iframe.allow = 'microphone';
            
            // Add to page
            container.appendChild(iframe);
            document.body.appendChild(container);
            
            // Handle mobile
            if (window.innerWidth < 480) {
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
                container.style.bottom = '0';
                container.style.right = '0';
            }
        },
        
        // Get widget URL with config
        getWidgetUrl: function() {
            const baseUrl = new URL('/widget/chat-widget.html', window.location.origin);
            baseUrl.searchParams.set('botUrl', this.config.botUrl);
            baseUrl.searchParams.set('title', this.config.title);
            baseUrl.searchParams.set('color', this.config.primaryColor);
            return baseUrl.toString();
        },
        
        // Open chat programmatically
        open: function() {
            const iframe = document.querySelector('#instabids-widget-container iframe');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ action: 'open' }, '*');
            }
        },
        
        // Close chat programmatically
        close: function() {
            const iframe = document.querySelector('#instabids-widget-container iframe');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ action: 'close' }, '*');
            }
        }
    };
    
    // Auto-load on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.InstabidsChat.load();
        });
    } else {
        window.InstabidsChat.load();
    }
})();