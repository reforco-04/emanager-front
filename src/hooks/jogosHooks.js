import { useMutation, useQuery } from "@tanstack/react-query";
import { API, queryClient } from './../services/index';

export const useBuscarJogo = () => {
    return useQuery({
        queryKey: ["jogos"],
        queryFn: async () => {
            const response = await API.get("/jogos");
            return response.data;
        }
    });
}

export const useCriarJogo = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const response = await API.post("/jogos", dados, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["jogos"]
            })
        }
    });
}

export const useEditarJogo = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const response = await API.put(`/jogos/${dados.id}`, dados, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["jogos"]
            })
        }
    });
}

export const usePesquisarJogo = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const response = await API.post('/jogos/pesquisar', dados);
            return response.data;
        }
    });
}

export const useDeletarJogo = () => {
    return useMutation({
        mutationFn: async (id) => {
            const response = await API.delete(`/jogos/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["jogos"]
            })
        }
    });
}