fetch('images.json')
  .then(response => response.json())
  .then(data => {
    const galleryContainer = document.getElementById('gallery');
    const images = data.images;

    images.forEach(image => {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('image-item');

      const link = document.createElement('a');
      link.href = image.image;  
      link.target = '_blank';

      const img = document.createElement('img');
      img.src = image.image;  
      img.alt = image.description;

      const description = document.createElement('p');
      description.classList.add('description');
      description.textContent = image.description;

      link.appendChild(img);
      link.appendChild(description);

      imageDiv.appendChild(link);
      galleryContainer.appendChild(imageDiv);
    });
  })
  .catch(error => console.log('Error loading the JSON:', error));
