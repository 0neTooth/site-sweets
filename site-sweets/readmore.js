document.addEventListener('DOMContentLoaded', function() 
{
    const readMoreBtn = document.querySelector('.read-more-btn');
    const moreText = document.querySelector('.more-text');
    
    if (readMoreBtn && moreText) 
        {
        readMoreBtn.addEventListener('click', function() {
            moreText.classList.toggle('active');
            
            if (moreText.classList.contains('active')) {
                readMoreBtn.textContent = 'Свернуть ';
            } else {
                readMoreBtn.textContent = 'Читать далее ';
            }
        });
    }
});