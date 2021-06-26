
function loadSidebar() {
    var navbar_code_str = `
    <div class="sidebar">
    <div class="sidebar-brand">
        <h2>
            <span class="lab la-accusoft"></span>
            <span>Marketing</span>
        </h2>
    </div>

    <div class="sidebar-menu">
        <ul>
            <li>
                <a href="index.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="screens/incluirDado.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Incluir Dados</span>
                </a>
            </li>
            <li>
                <a href="screens/editarDado.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Editar um Dado</span>
                </a>
            </li>
            <li>
                <a href="screens/consultarPorMes.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Consultar Publicações por Mês</span>
                </a>
            </li>
            <li>
                <a href="../consulta-mes/index.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Consultar Publicações por Escritórios</span>
                </a>
            </li>
            <li>
                <a href="screens/consultarPorInstituicoes.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Consultar Publicações por Instituições</span>
                </a>
            </li>
            <li>
                <a href="screens/consultarPorResponsaveis.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Consultar Publicações por Responsáveis</span>
                </a>
            </li>
            <li>
                <a href="screens/consultaComplexa.html" class="active">
                    <span class="las la-igloo"></span>
                    <span>Consulta Complexa</span>
                </a>
            </li>
        </ul>
    </div>

</div>`;
    $('body').append(navbar_code_str);
}