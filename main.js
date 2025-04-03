// 主JavaScript文件，用于添加交互功能

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 图片点击放大功能
    const images = document.querySelectorAll('img');
    const zoomContainer = document.createElement('div');
    zoomContainer.className = 'image-zoom-container';
    
    const zoomImage = document.createElement('img');
    zoomContainer.appendChild(zoomImage);
    document.body.appendChild(zoomContainer);
    
    images.forEach(img => {
        if (img.parentElement.className !== 'image-zoom-container') {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                zoomImage.src = img.src;
                zoomContainer.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    zoomContainer.addEventListener('click', () => {
        zoomContainer.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 添加键盘ESC键关闭功能
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && zoomContainer.classList.contains('active')) {
            zoomContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('AGORA AI TOYBOX website loaded');
});