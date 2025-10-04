package apka.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
public class JsonLoader {

    public final ObjectMapper mapper = new ObjectMapper();
    public final String ULR_TO_DATA = "resources/data.json";

    public JsonNode loadDatabase() {
        try {
            InputStream inputStream = new ClassPathResource("data.json").getInputStream();
            return mapper.readTree(inputStream);
        }
        catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
