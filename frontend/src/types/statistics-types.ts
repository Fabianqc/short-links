/**
 * Estructura de datos recomendada para recibir del backend.
 * Estas interfaces definen cómo deben ordenarse los datos para que sean fáciles de consumir por los gráficos.
 */

export interface StatisticsDashboardDto {
    summary: {
        totalClicks: number;
        uniqueVisitors: number;
    };
    /**
     * Datos para el gráfico de clicks sobre el tiempo (Line/Area Chart).
     * Se recomienda agrupar los clicks por fecha (día o mes).
     */
    clicksOverTime: {
        date: string; // Formato recomendado: '2024-01-01' o 'Mon', 'Tue' si es rango corto
        clicks: number;
    }[];

    /**
     * Datos para el gráfico de distribución de dispositivos (Pie/Donut Chart).
     * Agrupar por tipo de dispositivo.
     */
    devices: {
        name: string; // 'Mobile', 'Desktop', 'Tablet'
        value: number; // Cantidad de visitas
    }[];

    /**
     * Datos para el gráfico de barras de navegadores.
     * Agrupar por nombre del navegador.
     */
    browsers: {
        name: string; // 'Chrome', 'Firefox', etc.
        count: number;
    }[];

    /**
     * Opcional: Datos para sistemas operativos
     */
    os: {
        name: string; // 'Windows', 'Android', 'iOS'
        count: number;
    }[];
}
