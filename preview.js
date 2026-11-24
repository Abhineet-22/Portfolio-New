/**
 * Project / Media Modal Previewer
 * Enables deep-linking to preview project snapshots, certificates, or assets.
 * Usage: append ?preview=path/to/media.png to the URL.
 */
(function () {
    function initPreviewer() {
        const params = new URLSearchParams(window.location.search);
        const previewAsset = params.get('preview') || params.get('view') || params.get('project');
        
        // If no parameter present, do nothing (100% normal portfolio view)
        if (!previewAsset) return;

        // Modal backdrop overlay
        const overlay = document.createElement('div');
        overlay.id = 'portfolio-preview-modal';
        Object.assign(overlay.style, {
            position: 'fixed',
            inset: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '99999',
            padding: '20px'
        });

        // Modal content container
        const modal = document.createElement('div');
        Object.assign(modal.style, {
            backgroundColor: '#111827',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '750px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            color: '#f9fafb',
            position: 'relative'
        });

        // Header & close button
        const header = document.createElement('div');
        header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;';
        
        const title = document.createElement('span');
        title.style.cssText = 'font-weight: 600; font-family: monospace; font-size: 14px; color: #9ca3af;';
        title.textContent = `Asset Viewer: ${previewAsset.split('/').pop()}`;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = 'background: none; border: none; font-size: 24px; color: #9ca3af; cursor: pointer; line-height: 1;';
        const closeModal = () => overlay.remove();
        closeBtn.onclick = closeModal;

        header.appendChild(title);
        header.appendChild(closeBtn);

        // Active embedding sink (<object> browsing context)
        // Replace the embed block in preview.js with this standard dynamic loader:
        const embed = document.createElement('object');
        embed.setAttribute('data', previewAsset);
        embed.style.cssText = 'width: 100%; height: 420px; border-radius: 8px; border: 1px solid #1f2937; background: #030712;';

        modal.appendChild(header);
        modal.appendChild(embed);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close on background click or Escape key
        overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); }, { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreviewer);
    } else {
        initPreviewer();
    }
})();