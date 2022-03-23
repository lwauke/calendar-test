<template>
  <transition name="modal">
    <div class="modal-mask" @keyup.esc="$emit('close')">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>
              <slot name="header"></slot>
            </h3>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button"
                @click="$emit('close')"
                data-test-id="close-modal"
              >
                close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="sass" scoped>
.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  display: table

.modal-wrapper
  display: table-cell
  vertical-align: middle

.modal-container
  width: 300px
  margin: 0px auto
  padding: 50px 75px
  background-color: #fff
  border-radius: 15px
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33)
  transition: all 0.3s ease
  font-family: Helvetica, Arial, sans-serif

.modal-header h3
  margin-top: 0
  color: #42b983

.modal-body
  margin: 20px 0

.modal-enter, .modal-leave-active
  opacity: 0
</style>
