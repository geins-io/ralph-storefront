<template>
  <CaAccountPage class="ca-settings-page">
    <CaAccountSettings
      ref="settingsUser"
      title="Personlig information"
      @save="saveUser($refs.settingsUser)"
    >
      <template #content="{editMode}">
        <CaInputText
          v-if="editMode"
          id="email"
          v-model="user.email"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="E-mail"
        />
        <div v-else class="ca-settings-page__setting">
          <h3 class="ca-settings-page__setting-label">E-mail</h3>
          <p class="ca-settings-page__setting-value">{{ user.email }}</p>
        </div>

        <CaInputText
          v-if="editMode"
          id="firstname"
          v-model="user.firstName"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="Förnamn"
        />
        <div v-else-if="user.firstName" class="ca-settings-page__setting">
          <h3 class="ca-settings-page__setting-label">Förnamn</h3>
          <p class="ca-settings-page__setting-value">{{ user.firstName }}</p>
        </div>

        <CaInputText
          v-if="editMode"
          id="lastname"
          v-model="user.lastName"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="Efternamn"
        />
        <div v-else-if="user.lastName" class="ca-settings-page__setting">
          <h3 class="ca-settings-page__setting-label">Efternamn</h3>
          <p class="ca-settings-page__setting-value">{{ user.lastName }}</p>
        </div>

        <CaInputText
          v-if="editMode"
          id="phone"
          v-model="user.phone"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="Telefonnummer"
        />
        <div v-else-if="user.phone" class="ca-settings-page__setting">
          <h3 class="ca-settings-page__setting-label">Telefonnummer</h3>
          <p class="ca-settings-page__setting-value">{{ user.phone }}</p>
        </div>

        <div
          v-if="editMode"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
        >
          <h3
            class="ca-settings-page__setting-label ca-settings-page__setting-label--edit"
          >
            Kön
          </h3>
          <CaInputRadio
            v-for="(gender, index) in genders"
            :key="index"
            v-model="user.gender"
            :label="gender.label"
            :value="gender.value"
          />
        </div>
        <div v-else class="ca-settings-page__setting">
          <h3 class="ca-settings-page__setting-label">Kön</h3>
          <p class="ca-settings-page__setting-value">
            {{ genders.find(i => i.value === user.gender).label }}
          </p>
        </div>
      </template>
    </CaAccountSettings>
    <CaAccountSettings
      ref="settingsAddress"
      title="Leveransaddress"
      @save="saveUser($refs.settingsAddress)"
    >
      <template #content="{editMode}">
        <CaInputText
          v-if="editMode"
          id="co"
          v-model="user.address.shipping.co"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="C/O"
        />
        <div
          v-else-if="user.address.shipping.co"
          class="ca-settings-page__setting"
        >
          <h3 class="ca-settings-page__setting-label">C/O</h3>
          <p class="ca-settings-page__setting-value">
            {{ user.address.shipping.co }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="address"
          v-model="user.address.shipping.address"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="Gatuadress"
        />
        <CaInputText
          v-if="editMode"
          id="address2"
          v-model="user.address.shipping.address2"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          placeholder="Lägenhetsnummer, byggnad, våning, etc. (frivillig)"
        />
        <div
          v-else-if="user.address.shipping.address"
          class="ca-settings-page__setting"
        >
          <h3 class="ca-settings-page__setting-label">Gatuadress</h3>
          <p class="ca-settings-page__setting-value">
            {{ user.address.shipping.address }}
          </p>
          <p class="ca-settings-page__setting-value">
            {{ user.address.shipping.address2 }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="zip"
          v-model="user.address.shipping.zip"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="Postnummer"
        />
        <div
          v-else-if="user.address.shipping.zip"
          class="ca-settings-page__setting"
        >
          <h3 class="ca-settings-page__setting-label">Postnummer</h3>
          <p class="ca-settings-page__setting-value">
            {{ user.address.shipping.zip }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="city"
          v-model="user.address.shipping.city"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="Ort"
        />
        <div
          v-else-if="user.address.shipping.city"
          class="ca-settings-page__setting"
        >
          <h3 class="ca-settings-page__setting-label">Ort</h3>
          <p class="ca-settings-page__setting-value">
            {{ user.address.shipping.city }}
          </p>
        </div>

        <CaInputText
          v-if="editMode"
          id="country"
          v-model="user.address.shipping.country"
          :required="false"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
          label="Land"
        />
        <div
          v-else-if="user.address.shipping.country"
          class="ca-settings-page__setting"
        >
          <h3 class="ca-settings-page__setting-label">Land</h3>
          <p class="ca-settings-page__setting-value">
            {{ user.address.shipping.country }}
          </p>
        </div>
      </template>
    </CaAccountSettings>
    <CaAccountSettings
      ref="settingsNewsletter"
      title="Nyhetsbrev"
      @save="saveUser($refs.settingsNewsletter)"
    >
      <template #content="{editMode}">
        <div
          v-if="editMode"
          class="ca-settings-page__setting ca-settings-page__setting--edit"
        >
          <h3
            class="ca-settings-page__setting-label ca-settings-page__setting-label--edit"
          >
            Nyhetsbrev
          </h3>
          <CaInputRadio v-model="user.newsletter" label="Ja" :value="true" />
          <CaInputRadio v-model="user.newsletter" label="Nej" :value="false" />
        </div>
        <div v-else class="ca-settings-page__setting">
          <h3 class="ca-settings-page__setting-label">Nyhetsbrev</h3>
          <p class="ca-settings-page__setting-value">
            {{ user.newsletter ? 'Ja' : 'Nej' }}
          </p>
        </div>
      </template>
    </CaAccountSettings>
    <CaAccountSettings title="Säkerhetsinställningar" :editable="false">
      <template #content>
        <ul class="ca-settings-page__actions">
          <li class="ca-settings-page__action">
            <button class="ca-settings-page__action-button">
              Byt lösenord
            </button>
          </li>
          <li class="ca-settings-page__action">
            <button class="ca-settings-page__action-button">
              Radera konto
            </button>
          </li>
        </ul>
        <CaFeedback
          :constant="true"
          message="För att enbart ta bort personlig information, kontakta kundservice."
        />
      </template>
    </CaAccountSettings>
  </CaAccountPage>
</template>

<script>
export default {
  name: 'SettingsPage',
  transition: 'no-transition',
  data: () => ({
    user: {
      firstName: 'Olivia',
      lastName: 'Axelsson',
      email: 'olivia.axelsson@gmail.com',
      phone: '0709538601',
      gender: 'woman',
      newsletter: true,
      address: {
        shipping: {
          co: '',
          address: 'Gamla Huddingevägen 442',
          address2: '',
          zip: '125 42',
          city: 'Älvsjö',
          country: 'Sweden'
        }
      }
    },
    genders: [
      {
        value: 'unspecified',
        label: 'Ospecificerat'
      },
      {
        value: 'woman',
        label: 'Kvinna'
      },
      {
        value: 'man',
        label: 'Man'
      }
    ]
  }),
  methods: {
    saveUser(sectionRef) {
      // save user endpoint stuff
      sectionRef.toggleEditMode();
    }
  }
};
</script>

<style lang="scss">
.ca-settings-page {
  &__setting {
    & + & {
      margin: $px16 0 0;
    }
    &--edit {
      &:first-child {
        margin: $px8 0 0;
      }
    }
    @include bp(tablet) {
      font-size: $font-size-m;
    }
  }
  &__setting-label {
    font-weight: $font-weight-bold;
    &--edit {
      margin: 0 0 $px10;
    }
  }
  &__action {
    margin: 0 0 $px12;
  }
  &__action-button {
    text-decoration: underline;
  }
}
</style>
