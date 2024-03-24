import { http } from '@/utils/request';

export const search = (params) => {
  return http.get('music/search?keyword', {params});
};

export async function getMusicUrl(params: { songId: number; formate?: string; br?: string }) {
  return http.get('music/getMusicUrl', { params });
}
