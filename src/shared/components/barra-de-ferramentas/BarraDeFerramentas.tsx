import {
  Box,
  Button,
  Icon,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';

interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;

  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo,
}) => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            startIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
