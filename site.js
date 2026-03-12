document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuClose = document.querySelector('.mobile-menu-close');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');

  const openMenu = () => {
    if (!menuOverlay) {
      return;
    }
    menuOverlay.classList.add('active');
    body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    if (!menuOverlay) {
      return;
    }
    menuOverlay.classList.remove('active');
    body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.querySelectorAll('.mobile-menu-item').forEach((item) => {
      item.addEventListener('click', closeMenu);
    });
  }

  const ORDER_MODAL_ID = 'order-modal';
  const pickupUrl = 'https://order.redriverrestaurants.com/order/redrivercantina-richmond';
  const deliveryUrl = 'https://order.online/store/red-river-cantina-richmond-25078785/?delivery=true&hideModal=true';
  const modalMarkup = `
    <div class="order-modal" id="${ORDER_MODAL_ID}" aria-hidden="true" role="dialog" aria-labelledby="order-modal-title">
      <div class="order-modal__dialog" tabindex="-1">
        <button type="button" class="order-modal__close" data-modal-close aria-label="Close order options">×</button>
        <p class="order-modal__eyebrow">Richmond, Texas</p>
        <h2 class="order-modal__title" id="order-modal-title">Order Online</h2>
        <p class="order-modal__subtitle">Choose how you would like to enjoy Red River Cantina from our Richmond location.</p>
        <div class="order-modal__actions">
          <a class="btn btn-modern order-modal__primary" href="${pickupUrl}" target="_blank" rel="noopener">Pickup</a>
          <a class="btn btn-outline" href="${deliveryUrl}" target="_blank" rel="noopener">Delivery</a>
        </div>
      </div>
    </div>
  `;

  let lastFocusedElement = null;
  let keydownHandler = null;

  const ensureModal = () => {
    let modal = document.getElementById(ORDER_MODAL_ID);
    if (modal) {
      return modal;
    }
    body.insertAdjacentHTML('beforeend', modalMarkup);
    modal = document.getElementById(ORDER_MODAL_ID);

    if (!modal) {
      return null;
    }

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    modal.querySelectorAll('[data-modal-close]').forEach((closeButton) => {
      closeButton.addEventListener('click', closeModal);
    });

    return modal;
  };

  const trapFocus = (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    const modal = document.getElementById(ORDER_MODAL_ID);
    if (!modal || !modal.classList.contains('is-open')) {
      return;
    }

    const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(modal.querySelectorAll(focusableSelectors)).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(ORDER_MODAL_ID);
    if (!modal) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';

    document.removeEventListener('keydown', keydownHandler);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  const openModal = () => {
    const modal = ensureModal();
    if (!modal) {
      return;
    }

    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';

    const dialog = modal.querySelector('.order-modal__dialog');
    const primaryAction = modal.querySelector('.order-modal__primary');

    window.requestAnimationFrame(() => {
      (primaryAction || dialog).focus();
    });

    keydownHandler = (event) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }
      trapFocus(event);
    };

    document.addEventListener('keydown', keydownHandler);
  };

  const orderTriggers = document.querySelectorAll('[data-order-modal-trigger]');
  orderTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  });

  // Party Room Modal
  const PARTY_MODAL_ID = 'party-modal';
  let partyLastFocusedElement = null;
  let partyKeydownHandler = null;

  const closePartyModal = () => {
    const modal = document.getElementById(PARTY_MODAL_ID);
    if (!modal) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';

    document.removeEventListener('keydown', partyKeydownHandler);

    if (partyLastFocusedElement && typeof partyLastFocusedElement.focus === 'function') {
      partyLastFocusedElement.focus();
    }
  };

  const trapPartyFocus = (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    const modal = document.getElementById(PARTY_MODAL_ID);
    if (!modal || !modal.classList.contains('is-open')) {
      return;
    }

    const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(modal.querySelectorAll(focusableSelectors)).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openPartyModal = () => {
    const modal = document.getElementById(PARTY_MODAL_ID);
    if (!modal) {
      return;
    }

    partyLastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';

    const firstInput = modal.querySelector('input');
    window.requestAnimationFrame(() => {
      if (firstInput) {
        firstInput.focus();
      }
    });

    partyKeydownHandler = (event) => {
      if (event.key === 'Escape') {
        closePartyModal();
        return;
      }
      trapPartyFocus(event);
    };

    document.addEventListener('keydown', partyKeydownHandler);
  };

  // Party modal triggers
  const partyTriggers = document.querySelectorAll('[data-party-modal-trigger]');
  partyTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openPartyModal();
    });
  });

  // Party modal close handlers
  const partyModal = document.getElementById(PARTY_MODAL_ID);
  if (partyModal) {
    partyModal.addEventListener('click', (event) => {
      if (event.target === partyModal) {
        closePartyModal();
      }
    });

    partyModal.querySelectorAll('[data-party-modal-close]').forEach((closeButton) => {
      closeButton.addEventListener('click', closePartyModal);
    });
  }

  // Catering Modal
  const CATERING_MODAL_ID = 'catering-modal';
  let cateringLastFocusedElement = null;
  let cateringKeydownHandler = null;

  const closeCateringModal = () => {
    const modal = document.getElementById(CATERING_MODAL_ID);
    if (!modal) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';

    document.removeEventListener('keydown', cateringKeydownHandler);

    if (cateringLastFocusedElement && typeof cateringLastFocusedElement.focus === 'function') {
      cateringLastFocusedElement.focus();
    }
  };

  const trapCateringFocus = (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    const modal = document.getElementById(CATERING_MODAL_ID);
    if (!modal || !modal.classList.contains('is-open')) {
      return;
    }

    const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(modal.querySelectorAll(focusableSelectors)).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openCateringModal = () => {
    const modal = document.getElementById(CATERING_MODAL_ID);
    if (!modal) {
      return;
    }

    cateringLastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';

    const firstInput = modal.querySelector('input');
    window.requestAnimationFrame(() => {
      if (firstInput) {
        firstInput.focus();
      }
    });

    cateringKeydownHandler = (event) => {
      if (event.key === 'Escape') {
        closeCateringModal();
        return;
      }
      trapCateringFocus(event);
    };

    document.addEventListener('keydown', cateringKeydownHandler);
  };

  // Catering modal triggers
  const cateringTriggers = document.querySelectorAll('[data-catering-modal-trigger]');
  cateringTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openCateringModal();
    });
  });

  // Catering modal close handlers
  const cateringModal = document.getElementById(CATERING_MODAL_ID);
  if (cateringModal) {
    cateringModal.addEventListener('click', (event) => {
      if (event.target === cateringModal) {
        closeCateringModal();
      }
    });

    cateringModal.querySelectorAll('[data-catering-modal-close]').forEach((closeButton) => {
      closeButton.addEventListener('click', closeCateringModal);
    });
  }

  // Concerns Modal
  const CONCERNS_MODAL_ID = 'concerns-modal';
  let concernsLastFocusedElement = null;
  let concernsKeydownHandler = null;

  const closeConcernsModal = () => {
    const modal = document.getElementById(CONCERNS_MODAL_ID);
    if (!modal) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';

    document.removeEventListener('keydown', concernsKeydownHandler);

    if (concernsLastFocusedElement && typeof concernsLastFocusedElement.focus === 'function') {
      concernsLastFocusedElement.focus();
    }
  };

  const trapConcernsFocus = (event) => {
    if (event.key !== 'Tab') {
      return;
    }

    const modal = document.getElementById(CONCERNS_MODAL_ID);
    if (!modal || !modal.classList.contains('is-open')) {
      return;
    }

    const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(modal.querySelectorAll(focusableSelectors)).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openConcernsModal = () => {
    const modal = document.getElementById(CONCERNS_MODAL_ID);
    if (!modal) {
      return;
    }

    concernsLastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';

    const firstInput = modal.querySelector('input');
    window.requestAnimationFrame(() => {
      if (firstInput) {
        firstInput.focus();
      }
    });

    concernsKeydownHandler = (event) => {
      if (event.key === 'Escape') {
        closeConcernsModal();
        return;
      }
      trapConcernsFocus(event);
    };

    document.addEventListener('keydown', concernsKeydownHandler);
  };

  // Concerns modal triggers
  const concernsTriggers = document.querySelectorAll('[data-concerns-modal-trigger]');
  concernsTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openConcernsModal();
    });
  });

  // Concerns modal close handlers
  const concernsModal = document.getElementById(CONCERNS_MODAL_ID);
  if (concernsModal) {
    concernsModal.addEventListener('click', (event) => {
      if (event.target === concernsModal) {
        closeConcernsModal();
      }
    });

    concernsModal.querySelectorAll('[data-concerns-modal-close]').forEach((closeButton) => {
      closeButton.addEventListener('click', closeConcernsModal);
    });
  }

  // Concerns form submission (Formspree)
  const concernsForm = document.querySelector('.concerns-modal__form');
  if (concernsForm instanceof HTMLFormElement) {
    const submitButton = concernsForm.querySelector('button[type="submit"]');
    const statusElement = concernsForm.querySelector('.concerns-modal__status');

    const setFormStatus = (type, message) => {
      if (!(statusElement instanceof HTMLElement)) {
        return;
      }

      statusElement.textContent = message;
      statusElement.classList.add('is-visible');
      statusElement.classList.remove('is-loading', 'is-success', 'is-error');

      if (type) {
        statusElement.classList.add(type);
      }
    };

    const resetFormStatus = () => {
      if (!(statusElement instanceof HTMLElement)) {
        return;
      }

      statusElement.textContent = '';
      statusElement.classList.remove('is-visible', 'is-loading', 'is-success', 'is-error');
    };

    concernsForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!concernsForm.checkValidity()) {
        concernsForm.reportValidity();
        return;
      }

      const action = concernsForm.getAttribute('action');
      if (!action) {
        setFormStatus('is-error', 'Unable to send right now. Please call us at (281) 277-5060.');
        return;
      }

      const messageField = concernsForm.querySelector('textarea[name="message"]');
      const messageText = messageField instanceof HTMLTextAreaElement ? messageField.value.trim() : '';
      if (messageText.length < 10) {
        setFormStatus('is-error', 'Please include a little more detail so we can help you quickly.');
        if (messageField instanceof HTMLTextAreaElement) {
          messageField.focus();
        }
        return;
      }

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = true;
      }
      setFormStatus('is-loading', 'Sending your message...');

      try {
        const formData = new FormData(concernsForm);
        // Keep honeypot empty even if browser tools inject values.
        formData.set('_gotcha', '');
        const emailValue = formData.get('email');
        if (typeof emailValue === 'string' && emailValue.trim()) {
          formData.set('_replyto', emailValue.trim());
        }
        formData.set('source_page', window.location.pathname);
        formData.set('submitted_at', new Date().toISOString());

        const response = await fetch(action, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        concernsForm.reset();
        setFormStatus('is-success', 'Thanks for contacting Red River Cantina. Our team will follow up shortly.');
      } catch (_error) {
        setFormStatus('is-error', 'There was a problem sending your message. Please try again or call us at (281) 277-5060.');
      } finally {
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false;
        }
      }
    });

    concernsForm.addEventListener('input', resetFormStatus);
  }
});
