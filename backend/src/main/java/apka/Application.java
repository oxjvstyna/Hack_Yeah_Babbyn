package apka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"apka"})
@SpringBootApplication(scanBasePackages = "apka")
public class Application {
    public static void main(String args[]) {
        SpringApplication.run(Application.class, args);
    }
}
