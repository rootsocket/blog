<template>
  <div v-if="link" class="pt-4 pb-4 lg:px-8 flex flex-col sm:flex-row justify-between">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="text-gray-600 dark:text-gray-400 text-sm font-medium hover:underline flex items-center"
    >
      {{ $t('articleGithub') }}
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>
    <span class="text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center">
      {{ $t("articleUpdatedAt") }} {{ new Date(document.updatedAt).toLocaleDateString($i18n.locale, {day: 'numeric', month: 'long', year: 'numeric'}) }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'settings',
      'githubUrls'
    ]),
    link () {
      if (!this.settings.github) {
        return
      }
      return [
        this.githubUrls.repo,
        'blob',
        this.settings.defaultBranch,
        `content${this.document.path}${this.document.extension}`
      ].filter(path => !!path).join('/')
    }
  }
}
</script>

<i18n>
{
  "es": {
    "articleGithub": "Edita esta página en GitHub",
    "articleUpdatedAt": "Actualizado el"
  },
  "en": {
    "articleGithub": "Edit this page on GitHub",
    "articleUpdatedAt": "Updated at"
  }
}
</i18n>
