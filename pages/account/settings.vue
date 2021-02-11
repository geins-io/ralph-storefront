<template>
  <CaAccountPage class="ca-settings-page">
    <CaAccountSettings :user="user" :genders="genders" />
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
  methods: {}
};
</script>

<style lang="scss">
.ca-settings-page {
}
</style>
