<template>
  <div>
    <table class="w-full table-auto border-slate-500">
      <thead>
        <th class="text-left pl-2 py-1">Name</th>
        <th class="text-left pl-2 py-1">Set</th>
      </thead>
      <tbody>
        <tr v-for="card in data.cards" class="border-t border-slate-600 even:bg-amber-100 odd:bg-slate-200">
          <td class="text-left pl-2 py-1 border-slate-600 font-normal">
            {{ card.name }}
          </td>
          <td class="text-left pl-2 border-slate-600 font-light">
            {{ card.set }}
          </td>
        </tr>
      </tbody>
      <caption class="caption-bottom">
        Last Updated on
        {{ data.lastUpdatedDate }}
      </caption>
    </table>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/planeswalkers");
</script>
