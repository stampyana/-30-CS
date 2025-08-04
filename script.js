    document.addEventListener('DOMContentLoaded', () => {
      const productSelect = document.getElementById('product');
      const productImages = document.querySelectorAll('.product-image');
      const shirtOption = document.getElementById('shirt-option');
      const hatsOption = document.getElementById('hats-option');

      const deliveryMethod = document.getElementById('delivery-method');
      const paymentSection = document.getElementById('payment-section');
      const paymentMethod = document.getElementById('payment-method');
      const qrSection = document.getElementById('qr-section');
      const slipUpload = document.getElementById('slip-upload');
      const previewImage = document.getElementById('preview');

      function updateProductOptions() {
        productImages.forEach(img => img.classList.add('hidden'));
        shirtOption.classList.add('hidden');
        hatsOption.classList.add('hidden');

        const selected = productSelect.value;
        if (!selected) return;

        const imgToShow = document.getElementById(`img-${selected}`);
        if (imgToShow) {
          imgToShow.classList.remove('hidden');
        }

        if (selected === 'shirt') {
          shirtOption.classList.remove('hidden');
        } else if (selected === 'hats') {
          hatsOption.classList.remove('hidden');
        }
      }

      productSelect.addEventListener('change', updateProductOptions);

      function updatePaymentSection() {
        if (deliveryMethod.value === 'delivery') {
          paymentSection.classList.remove('hidden');
        } else {
          paymentSection.classList.add('hidden');
          paymentMethod.value = '';
          qrSection.classList.add('hidden');
          slipUpload.required = false;
          slipUpload.value = '';
          previewImage.style.display = 'none';
          previewImage.src = '';
        }
      }

      deliveryMethod.addEventListener('change', updatePaymentSection);

      paymentMethod.addEventListener('change', () => {
        if (paymentMethod.value === 'promptpay') {
          qrSection.classList.remove('hidden');
          slipUpload.required = true;
        } else {
          qrSection.classList.add('hidden');
          slipUpload.required = false;
          slipUpload.value = '';
          previewImage.style.display = 'none';
          previewImage.src = '';
        }
      });

      slipUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
          };
          reader.readAsDataURL(file);
        } else {
          previewImage.style.display = 'none';
          previewImage.src = '';
        }
      });
    });