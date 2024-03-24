<script setup lang="ts">
import { search, getMusicUrl } from '@/api/music';
import { useCopy } from '@/composable/copy';
import { secondsToFormattedMinutes } from "./kw.server.ts";

const processing = ref<boolean>(false);
const keyword = ref<string>('');
const tooltipText = ref<string>('复制');
const abslist = ref<any[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);
const br = ref<string>('128kmp3');

interface BrOption {
  label: string;
  value: string;
}

const brOptions: BrOption[] = [
  {
    label: '高品',
    value: '128kmp3',
  },
  {
    label: '超品',
    value: '320kmp3',
  },
  {
    label: '无损',
    value: '2000kflac',
  }
]

const searchKeyword = async () => {
  processing.value = true;
  const { abslist: list, TOTAL } = await search({ keyword: keyword.value, pn: page.value - 1, rn: 8 });
  processing.value = false;
  total.value = TOTAL * 1;
  abslist.value = list;
}

const handleKeyUp = (event) => {
  if (event.key === 'Enter') {
    searchKeyword()
  }
}

const handleCopy = async (id) => {
  const { data } = await getMusicUrl({ songId: id, br: br.value });
  const { copy, isJustCopied } = useCopy({ source: data.url, createToast: false });
  copy();
  watchEffect(() => {
    tooltipText.value = isJustCopied.value ? '复制成功！' : '复制';
  });
}

watch(page, searchKeyword);


</script>

<template>
  <div>
    <c-input-text v-model:value="keyword" placeholder="Enter a keyword..." clearable autofocus raw-text
      @keyup="handleKeyUp" />
    <div class="relative mt-8">
      <n-table>
        <thead>
          <tr>
            <th class="w-1/3">音乐</th>
            <th class="w-1/3">歌手</th>
            <th class="w-1/3">专辑</th>
            <th class="w-10">时长</th>
            <th class="w-20">
              <c-select v-model:value="br" label="" :options="brOptions" />
            </th>
          </tr>
        </thead>
        <tbody v-if="abslist.length && !processing">
          <tr v-for="item in abslist" :key="item.DC_TARGETID">
            <td class="w-1/4">{{ item.NAME }}</td>
            <td>{{ item.ARTIST }}</td>
            <td>{{ item.ALBUM }}</td>
            <td>{{ secondsToFormattedMinutes(item.DURATION) }}</td>
            <td class="w-20">
              <c-tooltip :tooltip="tooltipText">
                <c-button circle variant="text" size="small" @click="() => handleCopy(item.DC_TARGETID)">
                  <icon-mdi-content-copy />
                </c-button>
              </c-tooltip>
            </td>
          </tr>
        </tbody>
        <div v-if="!abslist.length && !processing" class="h-30">
          <div class="absolute inset-l-1/2 top-20  -translate-x-1/2">
            <n-empty description="No Date!"></n-empty>
          </div>
        </div>
        <div v-if="processing" class="h-30">
          <div class="absolute inset-l-1/2 top-24 -translate-x-1/2	">
            <n-spin size="medium" />
          </div>
        </div>
      </n-table>
      <div class="mt-8 flex justify-end">
        <n-pagination v-if="total > 1 && !processing" v-model:page="page" :page-count="total" />
      </div>

    </div>

  </div>
</template>
