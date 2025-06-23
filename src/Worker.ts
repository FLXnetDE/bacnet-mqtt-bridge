import logger from "./util/logger";

class Worker {

    private intervalId?: NodeJS.Timeout;
    private isRunning = false;

    /**
     * Starts the worker loop.
     * @param job The function to run on each cycle.
     * @param intervalMs Interval in milliseconds between executions.
     */
    public start(job: () => void | Promise<void>, intervalMs: number): void {
        if (this.isRunning) {
            logger.info('Worker is already running');
            return;
        }

        this.isRunning = true;

        logger.info(`Starting worker`);

        this.intervalId = setInterval(async () => {
            try {
                logger.info(`Running worker job...`);
                await job();
            } catch (err) {
                logger.error(`Error in worker job execution: ${err}`);
            }
            logger.info(`Worker job finished, waiting ${intervalMs}ms`);
        }, intervalMs);
    }

    /**
     * Stops the worker loop.
     */
    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        this.isRunning = false;
    }

}

export default Worker;