import { useEffect, useMemo, useState } from 'react';
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {
  IListagemPessoa,
  PessoasService,
} from '../../shared/services/api/pessoas/PessoasService';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result);
        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [busca]);

  return (
    <div>
      <LayoutBaseDePagina
        titulo="Listagem de pessoas"
        barraDeFerramentas={
          <FerramentasDaListagem
            textoBotaoNovo="Nova"
            mostrarInputBusca
            textoDaBusca={busca}
            aoMudarTextoDeBusca={(texto) =>
              setSearchParams({ busca: texto }, { replace: true })
            }
          />
        }
      >
        {/* {isLoading ? (
          <h1>Carregando dados...</h1>
        ) : ( */}
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ margin: 1, width: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Nome Completo</TableCell>
                <TableCell>E-mail</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>Ações</TableCell>
                    <TableCell>{row.nomeCompleto}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            {totalCount === 0 && !isLoading && (
              <caption>{Environment.LISTAGEM_VAZIA}</caption>
            )}

            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
        {/* )} */}
      </LayoutBaseDePagina>
    </div>
  );
};
